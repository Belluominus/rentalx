import { createConnection, getConnectionOptions, Connection } from "typeorm";

export default async (host = "database_ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "development" ? "localhost" : host,
      database:
        process.env.NODE_ENV === "development"
          ? "rentx_test"
          : defaultOptions.database,
    })
  );
};
