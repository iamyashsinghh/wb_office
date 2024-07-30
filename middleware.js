const { NextResponse } = require('next/server');

function middleware(request) {
  const host = request.headers.get('host');
  const url = request.nextUrl.clone();

  if (host && host.startsWith('www.')) {
    url.host = host.slice(4); // Remove 'www.' from the host
    url.protocol = request.nextUrl.protocol; // Preserve the protocol (http or https)
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

module.exports = { middleware };
