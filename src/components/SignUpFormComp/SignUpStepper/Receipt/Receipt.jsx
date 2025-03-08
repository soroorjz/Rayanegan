import React from "react";
import candidateData from "../../../ExamCardFile/data.json";
import { Container, Row, Col, Card, Image } from "react-bootstrap";
import "./Receipt.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const Receipt = () => {
  return (
    <Container fluid>
      <Container className="mt-3 Receipt-card-body">
        <Row className="card-title">
          <h4>رسید ثبت نام ارزیابی شونده</h4>
        </Row>

        <Card className="header-card">
          <Card.Body>
            <Row className="headerRow">
              <Col md={9}>
                <Row className="d-flex justify-content-center">
                  <div className="applicant-code mt-3">
                    <strong className="row d-flex justify-content-center">
                      نام و نام خانوادگی <span>{candidateData.firstName} {candidateData.lastName}</span>
                    </strong>
                  </div>
                </Row>
              </Col>
              <Col md={3}>
                <Row className="d-flex justify-content-center ">
                  <div className="personal-img-div d-flex justify-content-center">
                    <Image
                      src={candidateData.logo}
                      alt="personal photo"
                      fluid
                    />
                  </div>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Row className="info-div-col personalInfo">
          <Col md={3} className="info-div">
            <div className="mt-1">
              <label>
                کد ملی: <span>{candidateData.nationalCode}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                جنسیت: <span>{candidateData.gender}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                تاریخ تولد: <span>{candidateData.birthDate}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                سن: <span>{candidateData.age}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                نام پدر: <span>{candidateData.fatherName}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                تلفن: <span>{candidateData.phone}</span>
              </label>
            </div>
          </Col>

          <Col md={3} className="info-div">
            <div className="mt-1">
              <label>
                شماره شناسنامه: <span>{candidateData.idCard}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                محل تولد: <span>{candidateData.placeOfBirth}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                مدرک تحصیلی: <span>{candidateData.degree}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                رشته تحصیلی: <span>{candidateData.fieldOfStudy}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                وضعیت تاهل: <span>{candidateData.maritalStatus}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                شماره همراه: <span>{candidateData.mobile}</span>
              </label>
            </div>
          </Col>

          <Col md={3} className="info-div">
            <div className="mt-1">
              <label>
                کد پرسنلی: <span>{candidateData.personnelCode}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                پست سازمانی: <span>{candidateData.jobTitle}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                واحد سازمانی: <span>{candidateData.department}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                محل خدمت: <span>{candidateData.dutyStation}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                نوع استخدام: <span>{candidateData.employmentType}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                تاریخ استخدام: <span>{candidateData.dateOfEmployment}</span>
              </label>
            </div>
          </Col>

          <Col md={3} className="info-div">
            <div className="mt-1">
              <label>
                سنوات خدمت به سال: <span>{candidateData.yearsOfService}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                کد پستی: <span>{candidateData.postalCode}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                آدرس: <span className="wrap-text">{candidateData.address}</span>
              </label>
            </div>
          </Col>
        </Row>

        <div className="info-div-col">
          <Row>
            <small>
              ثبت نام شما در سنجش صلاحیت حرفه ای مربی پرورش فکری کودک و نوجوان
              با موفقیت انجام شد.
            </small>
          </Row>
          <Row>
            <small>
              مبلغ پرداخت شده: <span>{candidateData.amountPaid}</span>
            </small>
          </Row>
          <Row>
            <label>
              کد رهگیری پرداخت شما: <span>{candidateData.paymentCode}</span>
            </label>
          </Row>
        </div>

        <Row className="info-div-col">
          <Row className="text-center">
            <h4>نکات مهم</h4>
          </Row>

          <Col md={6} className="info-div">
            <div className="mt-1">
              <label>
                شروع ثبت نام: <span>{candidateData.startOfRegistration}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                شروع تکمیل مدارک:{" "}
                <span>{candidateData.documentCompletion}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                شروع سنجش: <span>{candidateData.startOfAssessment}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                محل برگزاری: استان تهران <span>{candidateData.location}</span>
              </label>
            </div>
            <p>
              شیوه و زمان شرکت در آزمون دانشی: متعاقباً اطلاع‌رسانی خواهد شد
            </p>
            <p>مدارک مورد نیاز (در بازه زمانی تکمیل مدارک):</p>
          </Col>

          <Col md={6} className="info-div">
            <div className="mt-1">
              <label>
                پایان ثبت نام: <span>{candidateData.endOfRegistration}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                پایان تکمیل مدارک: <span>{candidateData.endOfDocument}</span>
              </label>
            </div>
            <div className="mt-1">
              <label>
                پایان سنجش: <span>{candidateData.endOfAssessment}</span>
              </label>
            </div>
            <div className="mt-1">
              <small>آدرس مرکز آزمون متعاقباً اطلاع‌رسانی خواهد شد</small>
            </div>
            <p>
              شیوه و زمان شرکت در آزمون روانشناختی: متعاقباً اطلاع‌رسانی خواهد
              شد
            </p>
          </Col>

          <Row className="mt-1">
            <span>
              از زمان مراجعه حضوری جهت سنجش موارد ذیل را به همراه داشته باشید:
            </span>
          </Row>
          <Col md={6} className="info-div">
            <div>
              <label className="mt-1 me-3">1. اصل کارت ملی</label>
            </div>
            <div>
              <label className="mt-1 me-3">2. رسید پرداخت</label>
            </div>
          </Col>
          <Col md={6} className="info-div">
            <div>
              <span>3. کارت شناسایی ارزیابی‌شونده</span>
            </div>
            <div>
              <span>4. چک لیست طی مراحل سنجش</span>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Receipt;
