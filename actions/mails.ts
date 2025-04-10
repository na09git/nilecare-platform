"use server";

import { MailProps } from "@/components/Dashboard/ComposeMailForm";
import { Resend } from "resend";
export async function sendEmail(mailData: MailProps) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { to, subject, html, attachments } = mailData;
  try {
    //Send an Email with the Data
    const linkText = "Verify your Account ";
    const sendMail = await resend.emails.send({
      from: "NileCare Medical App <info@care.niletech.co>",
      to: to,
      subject: subject,
      html: html,
      attachments: attachments.map((file) => ({
        filename: file.title,
        path: file.url,
      })),
    });
    console.log(sendMail);

    return {
      data: sendMail,
      error: null,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      error: "Something went wrong",
    };
  }
}
