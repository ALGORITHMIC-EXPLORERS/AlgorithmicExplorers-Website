import os
import django
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from guru.models import GuruProfile
from courses.models import DegreeCourse

User = get_user_model()

class Command(BaseCommand):
    help = 'Setup admin users and instructor roles for development'

    def handle(self, *args, **options):
        # 1. Create Superuser if needed
        admin_email = os.environ.get('DJANGO_ADMIN_EMAIL', 'admin@aelearn.com')
        admin_password = os.environ.get('DJANGO_ADMIN_PASSWORD', 'admin123')
        
        if not User.objects.filter(email=admin_email).exists():
            self.stdout.write(f"Creating superuser {admin_email}...")
            User.objects.create_superuser(
                username=admin_email,
                email=admin_email,
                password=admin_password,
                first_name="Admin",
                last_name="AE"
            )
            self.stdout.write(self.style.SUCCESS('Successfully created superuser'))
        else:
            self.stdout.write(f"Superuser {admin_email} already exists")

        # 2. Setup Instructor Role for Demo user
        demo_instructor_email = os.environ.get('DEMO_INSTRUCTOR_EMAIL', 'instructor@aelearn.com')
        demo_instructor_password = os.environ.get('DEMO_INSTRUCTOR_PASSWORD', 'password123')
        
        if not User.objects.filter(email=demo_instructor_email).exists():
            self.stdout.write(f"Creating demo instructor {demo_instructor_email}...")
            instructor = User.objects.create_user(
                username=demo_instructor_email,
                email=demo_instructor_email,
                password=demo_instructor_password,
                first_name="John",
                last_name="Doe"
            )
            self.stdout.write(self.style.SUCCESS('Successfully created demo instructor'))
        else:
            instructor = User.objects.get(email=demo_instructor_email)
            self.stdout.write(f"Demo instructor {demo_instructor_email} already exists")

        # Ensure verified guru profile for dashboard access
        profile, created = GuruProfile.objects.get_or_create(user=instructor)
        if not profile.is_verified:
            profile.is_verified = True
            profile.cohort_id = "CERT-2024-AE-DEMO"
            profile.project_name = "Demo Course Content"
            profile.save()
            self.stdout.write(self.style.SUCCESS(f'Successfully verified {demo_instructor_email} as a Guru'))
        else:
            self.stdout.write(f"{demo_instructor_email} is already a verified Guru")

        self.stdout.write(self.style.SUCCESS('Role setup complete!'))
