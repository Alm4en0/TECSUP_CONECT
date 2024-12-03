import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private blogs = [
    {
      id: 1,
      user: { name: 'Jane Doe', profile: 'https://via.placeholder.com/50' },
      date: '2024-12-01',
      content: 'Contenido del blog informativo 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      type: 'informativo',
    },
    {
      id: 2,
      user: { name: 'John Smith', profile: 'https://via.placeholder.com/50' },
      date: '2024-11-29',
      content: 'Contenido del blog consulta 1. Curabitur pharetra, enim id facilisis ultricies, nunc urna cursus nunc.',
      type: 'consulta',
    },
    {
      id: 3,
      user: { name: 'Alice Johnson', profile: 'https://via.placeholder.com/50' },
      date: '2024-11-25',
      content: 'Contenido del blog informativo 2. Proin luctus mi ut ligula feugiat, non vulputate augue pharetra.',
      type: 'informativo',
    },
    {
      id: 4,
      user: { name: 'Bob Brown', profile: 'https://via.placeholder.com/50' },
      date: '2024-11-20',
      content: 'Contenido del blog consulta 2. Fusce facilisis tortor id libero tempor, id facilisis ligula laoreet.',
      type: 'consulta',
    },
  ];

  getBlogs(type: string = '', pageIndex: number = 0, pageSize: number = 5) {
    let filteredBlogs = this.blogs;

    // Filtrado por tipo (informativo o consulta)
    if (type) {
      filteredBlogs = this.blogs.filter(blog => blog.type === type);
    }

    // Paginación
    const startIndex = pageIndex * pageSize;
    const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + pageSize);

    return {
      blogs: paginatedBlogs,
      totalBlogs: filteredBlogs.length,
    };
  }
}
