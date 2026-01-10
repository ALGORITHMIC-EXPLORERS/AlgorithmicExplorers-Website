from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet, 
    JobOpportunityViewSet, 
    MentorshipOpportunityViewSet, 
    VerifyGuruView,
    GuruStatsView
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'jobs', JobOpportunityViewSet)
router.register(r'mentorships', MentorshipOpportunityViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('verify-guru/', VerifyGuruView.as_view(), name='verify-guru'),
    path('stats/', GuruStatsView.as_view(), name='guru-stats'),
]
