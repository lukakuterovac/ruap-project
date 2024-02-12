from django.urls import path

from . import views

urlpatterns = [
    path('predict/', views.predict, name='predict'),
    path('data/', views.data, name='data'),
    path('data/user/', views.user_data, name='user_data'),
    path('data/dataset/', views.dataset_data, name='dataset_data'),
    path('data/delete/<int:id>', views.delete_data, name='delete_data'),
]
