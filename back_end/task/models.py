from django.db import models


# Create your models here.


class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    is_completed = models.BooleanField(default=False)
    scheduled_at = models.DateTimeField(blank=True, null=True)
    remind_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return self.title
