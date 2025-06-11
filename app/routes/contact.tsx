// app/routes/contact.tsx
import { json, type ActionFunctionArgs } from "@remix-run/node";
import { Resend } from "resend";
import { z } from "zod";

// Type for the action response
export type ActionData = {
  success?: boolean;
  message?: string;
  error?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
};

// Zod schema for form validation
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
});

export async function action({
  request,
}: ActionFunctionArgs): Promise<Response> {
  if (request.method !== "POST") {
    return json<ActionData>({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const formData = await request.formData();

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    // Validate the form data
    const validatedData = contactFormSchema.parse(data);

    console.log("Validated contact form data:", validatedData);
    console.log("ENV RESEND_API_KEY:", process.env.RESEND_API_KEY);

    // Initialize Resend with your API key from environment variables
    const resend = new Resend(process.env.RESEND_API_KEY);

    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // IMPORTANT: This MUST be a domain you have verified with Resend.
      to: "saputrathoriq@gmail.com", // Your email address where you want to receive submissions
      replyTo: validatedData.email, // This is the magic! Replies will go directly to the sender.
      subject: validatedData.subject,
      html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${validatedData.name}</p>
    <p><strong>Email:</strong> ${validatedData.email}</p>
    <p><strong>Subject:</strong> ${validatedData.subject}</p>
    <p><strong>Message:</strong></p>
    <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
  `,
    });

    if (response.error) {
      console.error("Resend error:", response.error);
      return json<ActionData>(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return json<ActionData>({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      // Return validation errors
      const fieldErrors: ActionData["fieldErrors"] = {};
      error.errors.forEach((err) => {
        if (err.path[0]) {
          const field = err.path[0] as keyof NonNullable<
            ActionData["fieldErrors"]
          >;
          fieldErrors[field] = err.message;
        }
      });
      return json<ActionData>({ fieldErrors }, { status: 400 });
    }

    return json<ActionData>(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
