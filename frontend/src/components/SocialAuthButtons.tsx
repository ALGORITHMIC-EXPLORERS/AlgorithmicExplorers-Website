import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { PublicClientApplication, type AuthenticationResult } from "@azure/msal-browser";
import { LogIn, UserCircle2 } from "lucide-react";

import { useAuth } from "../context/AuthContext";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID ?? "";
const facebookAppId = import.meta.env.VITE_FACEBOOK_APP_ID ?? "";
const microsoftClientId = import.meta.env.VITE_MICROSOFT_CLIENT_ID ?? "";

const microsoftScopes = ["User.Read"];

const msalInstance = microsoftClientId
  ? new PublicClientApplication({
      auth: {
        clientId: microsoftClientId,
        authority: "https://login.microsoftonline.com/common",
        redirectUri: window.location.origin,
      },
    })
  : null;

type Props = { compact?: boolean };

const buttonBase =
  "flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3 text-white/80 text-sm transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40";

export default function SocialAuthButtons({ compact = false }: Props) {
  const navigate = useNavigate();
  const { socialLogin } = useAuth();

  const handleSuccess = () => navigate("/");

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (!tokenResponse.access_token) return;
      await socialLogin("google", tokenResponse.access_token);
      handleSuccess();
    },
    onError: (error) => console.error("google login error", error),
  });

  const handleMicrosoft = async () => {
    if (!msalInstance) return;
    try {
      const loginResponse = await msalInstance.loginPopup({ scopes: microsoftScopes });
      const account = loginResponse.account;
      let tokenResult: AuthenticationResult | null = null;
      try {
        tokenResult = await msalInstance.acquireTokenSilent({ account, scopes: microsoftScopes });
      } catch {
        tokenResult = await msalInstance.acquireTokenPopup({ scopes: microsoftScopes });
      }
      if (tokenResult?.accessToken) {
        await socialLogin("microsoft", tokenResult.accessToken);
        handleSuccess();
      }
    } catch (error) {
      console.error("microsoft login error", error);
    }
  };

  const isGoogleEnabled = Boolean(googleClientId);
  const isFacebookEnabled = Boolean(facebookAppId);
  const isMicrosoftEnabled = Boolean(microsoftClientId);

  return (
    <div className={`grid ${compact ? "grid-cols-2" : "grid-cols-3"} gap-3`}>
      <button
        type="button"
        onClick={() => googleLogin()}
        disabled={!isGoogleEnabled}
        className={buttonBase}
      >
        <UserCircle2 size={16} /> Google
      </button>

      <FacebookLogin
        appId={facebookAppId}
        onSuccess={async (res) => {
          if (res.accessToken) {
            await socialLogin("facebook", res.accessToken);
            handleSuccess();
          }
        }}
        onFail={(error) => console.error("facebook login error", error)}
        render={({ onClick }) => (
          <button type="button" onClick={onClick} disabled={!isFacebookEnabled} className={buttonBase}>
            <LogIn size={16} /> Facebook
          </button>
        )}
      />

      <button
        type="button"
        onClick={handleMicrosoft}
        disabled={!isMicrosoftEnabled}
        className={buttonBase}
      >
        <UserCircle2 size={16} /> Microsoft
      </button>
    </div>
  );
}
