from django.db import models
from django.conf import settings

class DegreeCourse(models.Model):
    STATUS_CHOICES = [
        ('Draft', 'Draft'),
        ('Publish', 'Publish'),
    ]
    LEVEL_CHOICES = [
        ('Beginner', 'Beginner'),
        ('Intermediate', 'Intermediate'),
        ('Expert', 'Expert'),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    instructor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="courses_taught")
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Draft')
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='Beginner')
    language = models.CharField(max_length=50, default='English')
    cc_options = models.JSONField(default=list, help_text="List of available subtitles/captions")
    intro_video_url = models.URLField(max_length=500, blank=True, null=True)
    intro_image_url = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} by {self.instructor.email}"

class CourseChapter(models.Model):
    TYPE_CHOICES = [
        ('PDF', 'PDF'),
        ('Video', 'Video'),
        ('PPT', 'PPT'),
    ]
    course = models.ForeignKey(DegreeCourse, related_name="chapters", on_delete=models.CASCADE)
    chapter_num = models.PositiveIntegerField()
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField()
    content_type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    resource_url = models.URLField(max_length=500)
    thumbnail_url = models.URLField(max_length=500, blank=True, null=True)
    is_published = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    meta_title = models.CharField(max_length=255, blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Ch {self.chapter_num}: {self.title} ({self.course.title})"
