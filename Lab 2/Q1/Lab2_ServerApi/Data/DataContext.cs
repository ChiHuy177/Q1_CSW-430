using Lab2_ServerApi.Models;
using Microsoft.EntityFrameworkCore;

namespace Lab2_ServerApi.Data
{
    public class DataContext(DbContextOptions<DataContext> options): DbContext(options)
    {
        public DbSet<Book> Books { get; set; }
    }
}
