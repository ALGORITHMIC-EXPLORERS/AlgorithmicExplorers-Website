from rest_framework import viewsets, permissions, views
from rest_framework.response import Response
from .models import Coupon, RevenueTransaction
from .serializers import CouponSerializer, RevenueTransactionSerializer
from courses.models import DegreeCourse

class CouponViewSet(viewsets.ModelViewSet):
    queryset = Coupon.objects.all()
    serializer_class = CouponSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(course__instructor=self.request.user)

class RevenueTransactionViewSet(viewsets.ModelViewSet):
    queryset = RevenueTransaction.objects.all()
    serializer_class = RevenueTransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(instructor=self.request.user)

class InstructorDashboardStatsView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        instructor = request.user
        courses = DegreeCourse.objects.filter(instructor=instructor)
        transactions = RevenueTransaction.objects.filter(instructor=instructor)
        
        total_revenue = sum(t.amount for t in transactions if t.transaction_type == 'Credit')
        total_commission = sum(t.commission for t in transactions)
        
        chart_data = [
            {"name": "Jan", "revenue": 4000, "prev": 2400},
            {"name": "Feb", "revenue": 3000, "prev": 1398},
            {"name": "Mar", "revenue": 2000, "prev": 9800},
            {"name": "Apr", "revenue": 2780, "prev": 3908},
            {"name": "May", "revenue": 1890, "prev": 4800},
            {"name": "Jun", "revenue": 2390, "prev": 3800},
            {"name": "Jul", "revenue": 3490, "prev": 4300},
        ]

        return Response({
            "total_courses": courses.count(),
            "total_revenue": total_revenue,
            "total_commission": total_commission,
            "chart_data": chart_data
        })
