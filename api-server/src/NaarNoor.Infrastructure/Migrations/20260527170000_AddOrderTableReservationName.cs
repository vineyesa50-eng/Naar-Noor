using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NaarNoor.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddOrderTableReservationName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TableReservationName",
                table: "Orders",
                type: "character varying(100)",
                maxLength: 100,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TableReservationName",
                table: "Orders");
        }
    }
}
