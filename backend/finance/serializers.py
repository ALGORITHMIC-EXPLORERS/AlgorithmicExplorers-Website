from rest_framework import serializers
from .models import Coupon, RevenueTransaction

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = '__all__'

class RevenueTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RevenueTransaction
        fields = '__all__'
