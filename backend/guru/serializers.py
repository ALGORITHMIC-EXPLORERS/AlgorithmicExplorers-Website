from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import GuruProfile, Project, JobOpportunity, MentorshipOpportunity

class GuruProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = GuruProfile
        fields = ['id', 'user', 'is_verified', 'cohort_id', 'project_name']

class ProjectSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model = Project
        fields = ['id', 'title', 'author', 'description', 'tags', 'image_url', 'likes_count', 'contributions_count', 'created_at']

class JobOpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOpportunity
        fields = ['id', 'company', 'role', 'description', 'skills', 'review_score', 'is_verified', 'total_spent', 'link', 'logo_url', 'created_at']

class MentorshipOpportunitySerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model = MentorshipOpportunity
        fields = ['id', 'author', 'topic', 'description', 'type', 'created_at']
