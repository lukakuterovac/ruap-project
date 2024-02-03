from django.urls import path

from . import views

urlpatterns = [
    path('predict/', views.predict, name='predict'),
    path('data/', views.data, name='data'),
]
