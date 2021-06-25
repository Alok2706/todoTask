from django.contrib import admin
from .models import Todo


# Register your models here.


class TodoAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'is_completed')


# Register your models here.

admin.site.register(Todo, TodoAdmin)
