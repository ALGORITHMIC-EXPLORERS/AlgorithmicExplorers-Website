from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CouponViewSet, RevenueTransactionViewSet, InstructorDashboardStatsView

router = DefaultRouter()
router.register(r'coupons', CouponViewSet, basename='instructor-coupons')
router.register(r'revenue', RevenueTransactionViewSet, basename='instructor-revenue')

urlpatterns = [
    path('', include(router.urls)),
    path('instructor-stats/', InstructorDashboardStatsView.as_view(), name='instructor-stats'),
]
