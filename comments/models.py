# -*- coding: utf-8 -*-

from django.db import models

class Comment(models.Model):
	title = models.CharField("title", max_length=255)
	body = models.TextField("body")
