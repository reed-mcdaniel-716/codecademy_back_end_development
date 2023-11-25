## Swagger API Development

- local install of Swagger Editor downloaded from GitHub [here](https://github.com/swagger-api/swagger-editor)

- to get al orders:
```shell
curl --header "Content-Type: application/json" http://localhost:3000/orders
```

- to create a new order:
```shell
curl --header "Content-Type: application/json" -d "@new_order.json" http://localhost:3000/neworder
```

- to update an existing order
```shell
curl -X PUT -d complete http://localhost:3000/update/001
```

- to delete an existing order
```shell
curl -X DELETE http://localhost:3000/delete/002
```
