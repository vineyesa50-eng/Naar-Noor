---
name: ASP.NET Core backend setup
description: Key quirks for running dotnet on Replit — workflow working directory, DATABASE_URL format, and dotnet-ef tool path
---

# ASP.NET Core on Replit — Non-Obvious Decisions

## Workflow run command needs absolute path
The artifact.toml `run` field is executed from an unknown CWD (not `/home/runner/workspace`), so relative paths like `artifacts/api-server/run-dev.sh` fail with "No such file or directory". Use an absolute path or a shell script that self-navigates with `$(dirname "$0")`:

```
run = "bash /home/runner/workspace/artifacts/api-server/run-dev.sh"
```

**Why:** Replit's workflow runner does not guarantee CWD = workspace root.

## Replit DATABASE_URL must be converted
`DATABASE_URL` is runtime-managed and uses `postgresql://user:pass@host/db?sslmode=...` URI format. Npgsql 8.x cannot parse this URI format directly (throws `Couldn't set <entire url>` error). Use `NormaliseConnectionString()` in `DependencyInjection.cs` to convert it to key=value format:
```
Host=...;Port=5432;Database=...;Username=...;Password=...;Trust Server Certificate=true;SSL Mode=Prefer;
```
**Why:** Npgsql expects key=value connection strings; the `?sslmode` query param without a complete value causes a dictionary key error.

## dotnet-ef global tool path broken
`dotnet tool install --global dotnet-ef` installs to `~/.dotnet/tools` but the Nix-wrapped dotnet runtime isn't found from there. Use a **local tool manifest** instead:
```bash
cd artifacts/api-server
dotnet new tool-manifest
dotnet tool install dotnet-ef --version 8.0.11
dotnet tool run dotnet-ef migrations add ...
```

## Empty ConnectionStrings key bypasses DATABASE_URL
If `appsettings.json` has `"DefaultConnection": ""`, `GetConnectionString()` returns `""` (empty, not null), so the `??` operator never falls through to `DATABASE_URL`. Use `string.IsNullOrWhiteSpace()` checks instead of `??`.
