import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserProfileSService {
  private blogs = [
    {
      id: 1,
      title: 'Blog 1',
      content: 'Contenido 1',
      user: { name: 'Jane Doe' },
      savedBy: 'John Doe',
    },
    {
      id: 2,
      title: 'Blog 2',
      content: 'Contenido 2',
      user: { name: 'Jane Doe' },
      savedBy: 'Jane Doe',
    },
    {
      id: 3,
      title: 'Blog 3',
      content: 'Contenido 3',
      user: { name: 'John Doe' },
      savedBy: 'Jane Doe',
    },
  ];

  private users = [
    {
      name: 'Jane Doe',
      profileImage: 'https://via.placeholder.com/150',
      cycle: '6to',
      career: 'Ingeniería de Software',
    },
    {
      name: 'John Doe',
      profileImage: 'https://via.placeholder.com/150',
      cycle: '4to',
      career: 'Redes y Comunicaciones',
    },
  ];

  getBlogs() {
    return { blogs: this.blogs };
  }

  getUser(name: string) {
    return this.users.find((user) => user.name === name);
  }
}
