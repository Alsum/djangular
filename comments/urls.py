from django.conf.urls import url
from comments import views

urlpatterns = [
    url(r'^comments/$', views.ComentarioList.as_view(), name="comments"),
    url(r'^comments/(?P<pk>[0-9]+)/$', views.CommentDetail.as_view(), name="comments-detail"),
    url(r'^$', views.CommentView.as_view()),
]
