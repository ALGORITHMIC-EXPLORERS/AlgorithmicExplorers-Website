from rest_framework import viewsets, permissions, status, views
from rest_framework.response import Response
from .models import GuruProfile, Project, JobOpportunity, MentorshipOpportunity
from .serializers import (
    GuruProfileSerializer, ProjectSerializer, JobOpportunitySerializer, 
    MentorshipOpportunitySerializer
)

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class JobOpportunityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JobOpportunity.objects.all().order_by('-created_at')
    serializer_class = JobOpportunitySerializer
    permission_classes = [permissions.AllowAny]

class MentorshipOpportunityViewSet(viewsets.ModelViewSet):
    queryset = MentorshipOpportunity.objects.all().order_by('-created_at')
    serializer_class = MentorshipOpportunitySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class VerifyGuruView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        cohort_id = (request.data.get('cohortId') or "").strip()
        project_name = (request.data.get('projectName') or "").strip()

        if not cohort_id or not project_name:
            return Response({"error": "Both Cohort ID and Project Name are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Demo logic: Case-insensitive match for the specific demo certification ID
        if cohort_id.upper() == "CERT-2024-AE-001":
            profile, created = GuruProfile.objects.get_or_create(user=request.user)
            profile.is_verified = True
            profile.cohort_id = cohort_id
            profile.project_name = project_name
            profile.save()
            
            from accounts.views import _build_auth_payload
            data = _build_auth_payload(request.user)
            return Response({
                "message": "Successfully verified as a Guru!",
                "user": data['user']
            }, status=status.HTTP_200_OK)
        
        return Response({"error": "Invalid verification credentials. Tip: Use 'CERT-2024-AE-001'."}, status=status.HTTP_400_BAD_REQUEST)

class GuruStatsView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        active_gurus = GuruProfile.objects.filter(is_verified=True).count()
        total_projects = Project.objects.count()
        total_jobs = JobOpportunity.objects.count()
        
        # Hardcoding some initial counts as seen in designs if they are empty
        return Response({
            "active_gurus": max(active_gurus, 134),
            "total_discussions": "1.2K", # Placeholder
            "completed_projects": max(total_projects, 500),
            "job_postings": max(total_jobs, 180),
        })
