from django.db import models

# Create your models here.
class Todo(models.Model):
    username = models.CharField(verbose_name="名前", max_length=255)
    content = models.CharField(verbose_name="内容", max_length=255)

    def __str__(self):
        return f'{self.username} {self.content}'