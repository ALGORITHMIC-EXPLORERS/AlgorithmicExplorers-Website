from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DegreeCourseViewSet, CourseChapterViewSet

router = DefaultRouter()
router.register(r'courses', DegreeCourseViewSet, basename='instructor-courses')
router.register(r'course-chapters', CourseChapterViewSet, basename='instructor-chapters')

urlpatterns = [
    path('', include(router.urls)),
]
