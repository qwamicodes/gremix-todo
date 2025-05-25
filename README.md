# Todo List

![Screenshot](./assets/screenshot.jpg)

For small teams, todo list helps you get things done. Simple!

You can immediately deploy your version with the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fblackmann%2Ftodo-list&env=COOKIE_SECRET&integration-ids=oac_3sK3gnG06emjIEVL09jjntDD)

## Development

Yarn is the package manager. Run `yarn` to install the dependencies.

Prisma is the ORM. Run `yarn prisma generate` to generate the Prisma client and `yarn prisma migrate deploy` to apply the migrations.

Postgres is the database. Run `yarn prisma studio` to open the Prisma studio and view records. Or you can use a GUI app like TablePlus or whatever you like.

### Environment Variables

```bash
DATABASE_URL="postgresql://postgres@127.0.0.1:5432/todolist"
COOKIE_SECRET="somerandomstring"
```

