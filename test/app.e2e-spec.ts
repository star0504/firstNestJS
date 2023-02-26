import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  // 해당 테스트 클래스를 초기화할 때 딱 한번 수행되는 메서드다.
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // 실제 어플리케이션 환경과 동일해야 오류가 발생하지 않는다.
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // decorator가 없으면 제거함
        forbidNonWhitelisted: true, // whiterlist에 없으면 error
        transform: true, // 타입을 받아서 우리가 원하는 타입으로 변경해줌.
        // 예를 들어 req로 들어오는 값은 string인데 우리가 type을 number로 지정하면 알아서 number로 변환해줌.
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    // 유닛 테스트와는 다르게 외부 함수가 아니라 클래스 메소드로
    // 함수들을 사용한다.
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/movie (GET)', () => {
    // app.getHttpServer()를 사용하면 직접 주소 (http://localhost:3000 ~)를
    // 써줄 필요가 없다.
    return request(app.getHttpServer()).get('/movie').expect([]);
  });

  // expect 자리에  상태코드를 적어줄 수 있다.
  describe('/movie', () => {
    it('/movie (GET)', () => {
      return request(app.getHttpServer()).get('/movie').expect([]);
    });
  });

  it('POST', () => {
    return request(app.getHttpServer())
      .post('/movie')
      .send({
        title: '',
        year: 0,
        genres: '',
      })
      .expect(201);
  });
  it('PATCH', () => {
    return request(app.getHttpServer())
      .patch('/movie/1')
      .send({ title: '' })
      .expect(200);
  });
  it('DELETE', () => {
    return request(app.getHttpServer()).delete('/movie/1').expect(200);
  });
});
