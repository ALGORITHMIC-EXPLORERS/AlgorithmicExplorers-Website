from django.db import models
from django.conf import settings
from courses.models import DegreeCourse

class Coupon(models.Model):
    STATUS_CHOICES = [
        ('Active', 'Active'),
        ('Expired', 'Expired'),
        ('Draft', 'Draft'),
        ('Scheduled', 'Scheduled'),
    ]
    DISCOUNT_TYPE_CHOICES = [
        ('Percentage', 'Percentage'),
        ('Fixed Amount', 'Fixed Amount'),
    ]
    course = models.ForeignKey(DegreeCourse, related_name="coupons", on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    code = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Draft')
    discount_type = models.CharField(max_length=20, choices=DISCOUNT_TYPE_CHOICES)
    discount_value = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=0)
    redemptions = models.PositiveIntegerField(default=0)
    uses_per_customer = models.PositiveIntegerField(default=1)
    priority = models.CharField(max_length=10, default='Medium')
    start_date = models.DateTimeField(null=True, blank=True)
    end_date = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.code} - {self.name}"

class RevenueTransaction(models.Model):
    TYPE_CHOICES = [
        ('Credit', 'Credit'),
        ('Debit', 'Debit'),
    ]
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="revenue_records")
    course = models.ForeignKey(DegreeCourse, on_delete=models.SET_NULL, null=True, blank=True)
    order_id = models.CharField(max_length=100)
    customer_name = models.CharField(max_length=255)
    transaction_type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    commission = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, default='Received')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.transaction_type} of {self.amount} for {self.instructor.email}"
