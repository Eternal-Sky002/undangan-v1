const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://undangan-backend-4y0g.onrender.com'
).replace(/\/+$/, '');

function getErrorMessage(responseText, status) {
  if (!responseText) return `Server mengembalikan HTTP ${status}.`;

  try {
    const body = JSON.parse(responseText);
    if (typeof body?.detail === 'string') return body.detail;
    if (Array.isArray(body?.detail)) {
      return body.detail
        .map((error) => {
          const field = Array.isArray(error.loc) ? error.loc.at(-1) : null;
          return field ? `${field}: ${error.msg}` : error.msg;
        })
        .join('; ');
    }
  } catch (error) {
    if (!(error instanceof SyntaxError)) throw error;
  }

  return `Server mengembalikan HTTP ${status}.`;
}

export async function createRsvp(rsvp) {
  const response = await fetch(`${API_BASE_URL}/api/rsvps`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(rsvp),
  });

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(getErrorMessage(responseText, response.status));
  }
}

export async function getInvitation(slug) {
  const response = await fetch(`${API_BASE_URL}/api/invitations/${encodeURIComponent(slug)}`);

  if (response.status === 404) return null;

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(getErrorMessage(responseText, response.status));
  }

  const invitation = await response.json();
  if (
    !invitation ||
    typeof invitation.name !== 'string' ||
    !invitation.name.trim() ||
    typeof invitation.slug !== 'string' ||
    invitation.slug !== slug
  ) {
    throw new Error('Format data undangan dari server tidak valid.');
  }

  return invitation;
}

export async function listRsvps() {
  const response = await fetch(`${API_BASE_URL}/api/rsvps`);

  if (!response.ok) {
    const responseText = await response.text();
    throw new Error(getErrorMessage(responseText, response.status));
  }

  const rsvps = await response.json();
  if (!Array.isArray(rsvps)) {
    throw new Error('Format data RSVP dari server tidak valid.');
  }

  return rsvps;
}
