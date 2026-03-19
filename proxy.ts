import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(request: NextRequest){
    const {pathname} = request.nextUrl;
    const token = request.cookies.get('Atielie_JWT')?.value;

    if(pathname.startsWith('/admin')){
        if(!token){
            return NextResponse.redirect(new URL('/sign-in', request.url));
        }
        
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const {payload} = await jwtVerify(token , secret);

            if(payload.role !== 'admin'){
                return NextResponse.redirect(new URL('/' , request.url))
            }

            return NextResponse.next()
        } catch (error) {
            console.error("JWT Verification Failed" , error);
            return NextResponse.redirect(new URL('/sign-in', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}