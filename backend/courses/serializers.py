from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import DegreeCourse, CourseChapter

class CourseChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseChapter
        fields = '__all__'

class DegreeCourseSerializer(serializers.ModelSerializer):
    chapters = CourseChapterSerializer(many=True, read_only=True)
    instructor = UserSerializer(read_only=True)
    
    class Meta:
        model = DegreeCourse
        fields = '__all__'
