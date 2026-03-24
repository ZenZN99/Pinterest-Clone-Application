import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  getHello(@Res() res: Response) {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Hello Nest</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      height: 100vh;
      font-family: 'Inter', sans-serif;
      background: linear-gradient(135deg, #e0234e, #000000);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }

    .card {
      background: rgba(0, 0, 0, 0.45);
      backdrop-filter: blur(15px);
      padding: 50px;
      border-radius: 24px;
      text-align: center;
      width: 420px;
      box-shadow: 0 25px 60px rgba(0,0,0,0.4);
    }

    .logo {
      width: 120px;
      margin-bottom: 20px;
      animation: float 3s ease-in-out infinite;
    }

    h1 {
      font-size: 42px;
      margin: 10px 0;
      font-weight: 800;
      color: #e0234e;
    }

    p {
      font-size: 16px;
      opacity: 0.9;
      line-height: 1.6;
      margin-bottom: 25px;
    }

    .badge {
      display: inline-block;
      padding: 8px 18px;
      border-radius: 999px;
      background: #e0234e;
      font-weight: 600;
      font-size: 14px;
    }

    @keyframes float {
      0% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
      100% { transform: translateY(0); }
    }
  </style>
</head>
<body>
  <div class="card">
    <img
      class="logo"
      src="https://nestjs.com/img/logo-small.svg"
      alt="NestJS Logo"
    />
    <h1>Hello Nest 🚀</h1>
    <p>
      Welcome to your NestJS backend.<br />
      Clean architecture, scalable design,<br />
      and production-ready APIs.
    </p>
    <div class="badge">NestJS • TypeScript • Backend</div>
  </div>
</body>
</html>
    `);
  }
}