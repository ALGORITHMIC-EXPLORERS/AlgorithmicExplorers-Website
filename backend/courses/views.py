from rest_framework import viewsets, permissions
from .models import DegreeCourse, CourseChapter
from .serializers import DegreeCourseSerializer, CourseChapterSerializer

class DegreeCourseViewSet(viewsets.ModelViewSet):
    queryset = DegreeCourse.objects.all()
    serializer_class = DegreeCourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(instructor=self.request.user)

    def perform_create(self, serializer):
        serializer.save(instructor=self.request.user)

class CourseChapterViewSet(viewsets.ModelViewSet):
    queryset = CourseChapter.objects.all()
    serializer_class = CourseChapterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(course__instructor=self.request.user)
