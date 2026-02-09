import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, company, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: "Zeitwerk Contact <onboarding@resend.dev>",
            to: "naukhan1@gmail.com",
            subject: `New inquiry from ${name}${company ? ` (${company})` : ""}`,
            replyTo: email,
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="border-bottom: 3px solid #E2000F; padding-bottom: 16px; margin-bottom: 24px;">
                        <h2 style="margin: 0; color: #171717;">New Consultation Request</h2>
                    </div>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
                    <div style="margin-top: 24px; padding: 16px; background: #f9f9f9; border-radius: 8px;">
                        <p style="margin: 0 0 8px 0; font-weight: 600; color: #171717;">Message:</p>
                        <p style="margin: 0; white-space: pre-wrap; color: #555;">${message}</p>
                    </div>
                    <p style="margin-top: 32px; font-size: 13px; color: #999;">
                        Sent via zeitwerk.ca contact form
                    </p>
                </div>
            `,
        });

        console.log("Resend response:", JSON.stringify({ data, error }, null, 2));

        if (error) {
            console.error("Resend error:", JSON.stringify(error, null, 2));
            return NextResponse.json(
                { error: error.message || "Failed to send email." },
                { status: 422 }
            );
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (error) {
        console.error("Contact form error:", JSON.stringify(error, null, 2));
        return NextResponse.json(
            { error: "Failed to send message." },
            { status: 500 }
        );
    }
}
