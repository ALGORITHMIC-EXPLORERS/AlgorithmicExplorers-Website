from django.db import models
from django.conf import settings

class GuruProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, related_name="profile", on_delete=models.CASCADE)
    is_verified = models.BooleanField(default=False)
    cohort_id = models.CharField(max_length=100, blank=True, null=True)
    project_name = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.user.email} - {'Verified' if self.is_verified else 'Unverified'}"

class Project(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    description = models.TextField()
    tags = models.JSONField(default=list)
    image_url = models.URLField(max_length=500, blank=True, null=True)
    likes_count = models.PositiveIntegerField(default=0)
    contributions_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class JobOpportunity(models.Model):
    company = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    description = models.TextField()
    skills = models.JSONField(default=list)
    review_score = models.CharField(max_length=50, default="5.00 of 48 reviews")
    is_verified = models.BooleanField(default=True)
    total_spent = models.CharField(max_length=100, default="$60k+ total spent")
    link = models.URLField(max_length=500)
    logo_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.role} at {self.company}"

class MentorshipOpportunity(models.Model):
    TYPE_CHOICES = [
        ('Offering', 'Offering'),
        ('Seeking', 'Seeking'),
    ]
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    topic = models.CharField(max_length=255)
    description = models.TextField()
    type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.type}: {self.topic} by {self.author.email}"
