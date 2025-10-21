using System.ComponentModel.DataAnnotations;

namespace Lab2_ServerApi.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name {  get; set; }

        public string? Description { get; set; }

        [Required]
        public double Price {  get; set; }

        public string? Note { get; set; }
    }
}
