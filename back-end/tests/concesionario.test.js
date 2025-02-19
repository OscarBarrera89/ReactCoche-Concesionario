const request = require("supertest");
const app = require("../index");

  test("✅ GET /api/concesionario → Obtener lista de concesionarios", async () => {
    const res = await request(app).get("/api/concesionario");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.datos)).toBe(true);
  });

  test("✅ POST /api/concesionario → Crear un concesionario", async () => {
    const res = await request(app)
      .post("/api/concesionario")
      .send({
        nombre: "Concesionario Test",
        direccion: "Calle Falsa 123",
        fecha_fundacion: "2020-01-01",
        activo: true,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.datos.nombre).toBe("Concesionario Test");
  });

  test("✅ GET /api/concesionario/:id → Obtener concesionario por ID", async () => {
    const nuevo = await request(app)
      .post("/api/concesionario")
      .send({ nombre: "Nuevo Concesionario", direccion: "Av. Principal 456", fecha_fundacion: "2018-05-10", activo: true });
    const id = nuevo.body.datos.id_concesionario;
    const res = await request(app).get(`/api/concesionario/${id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.datos.nombre).toBe("Nuevo Concesionario");
  });

  test("✅ GET /api/concesionario/nombre/:nombre → Obtener concesionario por nombre", async () => {
    await request(app)
      .post("/api/concesionario")
      .send({
        nombre: "Concesionario Nombre Test",
        direccion: "Calle Test 123",
        fecha_fundacion: "2019-06-15",
        activo: true,
      });

    const res = await request(app).get("/api/concesionario/nombre/Concesionario Nombre Test");

    expect(res.statusCode).toBe(200);
    expect(res.body.datos.nombre).toBe("Concesionario Nombre Test");
  });

  test("✅ PUT /api/concesionario/:id → Actualizar concesionario", async () => {
    const nuevo = await request(app)
      .post("/api/concesionario")
      .send({
        nombre: "Concesionario a Actualizar",
        direccion: "Avenida Vieja 789",
        fecha_fundacion: "2017-11-23",
        activo: false,
      });

    const id = nuevo.body.datos.id_concesionario;
    expect(id).toBeDefined();
    
    const res = await request(app)
      .put(`/api/concesionario/${id}`)
      .send({
        nombre: "Concesionario Actualizado",
        direccion: "Nueva Dirección 456",
        fecha_fundacion: "2017-11-23",
        activo: true,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.datos.nombre).toBe("Concesionario Actualizado");
    expect(res.body.datos.direccion).toBe("Nueva Dirección 456");
    expect(res.body.datos.activo).toBe(true);
  });

  test("✅ DELETE /api/concesionario/:id → Eliminar concesionario", async () => {
    const nuevo = await request(app)
      .post("/api/concesionario")
      .send({ nombre: "Eliminar Concesionario", direccion: "Plaza Central", fecha_fundacion: "2015-03-20", activo: false });
    const id = nuevo.body.datos.id_concesionario;
    const res = await request(app).delete(`/api/concesionario/${id}`);
    expect(res.statusCode).toBe(200);
  });
