const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export function welcomeEmail({ name }: { name?: string }) {
  const greeting = name ? `Hola ${name}` : 'Hola';
  return {
    subject: 'Bienvenido a la plataforma',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>${greeting},</h2>
        <p>Tu cuenta ha sido creada exitosamente.</p>
        <p>Ya puedes acceder a tu dashboard:</p>
        <a href="${BASE_URL}/dashboard" 
           style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">
          Ir al Dashboard
        </a>
        <p style="color: #666; font-size: 14px; margin-top: 32px;">
          Si tienes alguna duda, responde a este correo.
        </p>
      </div>
    `,
  };
}

export function invitationEmail({
  teamName,
  invitedByEmail,
  role,
  inviteId,
}: {
  teamName: string;
  invitedByEmail: string;
  role: string;
  inviteId: number;
}) {
  return {
    subject: `Te han invitado a unirte a ${teamName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Tienes una invitación</h2>
        <p><strong>${invitedByEmail}</strong> te ha invitado a unirte al equipo <strong>${teamName}</strong> como <strong>${role}</strong>.</p>
        <a href="${BASE_URL}/sign-up?inviteId=${inviteId}" 
           style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">
          Aceptar invitación
        </a>
        <p style="color: #666; font-size: 14px; margin-top: 32px;">
          Si no esperabas esta invitación, puedes ignorar este correo.
        </p>
      </div>
    `,
  };
}

export function passwordResetEmail({ resetToken }: { resetToken: string }) {
  return {
    subject: 'Restablecer tu contraseña',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Solicitud de restablecimiento de contraseña</h2>
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <a href="${BASE_URL}/reset-password?token=${resetToken}" 
           style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">
          Restablecer contraseña
        </a>
        <p style="color: #666; font-size: 14px; margin-top: 32px;">
          Si no solicitaste este cambio, ignora este correo. El enlace expira en 1 hora.
        </p>
      </div>
    `,
  };
}
