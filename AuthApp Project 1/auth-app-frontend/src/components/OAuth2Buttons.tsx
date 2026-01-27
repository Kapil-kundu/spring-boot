import React from 'react';
import { Button } from './ui/button';
import { Github, Chrome } from 'lucide-react';
import { NavLink } from 'react-router';

function OAuth2Buttons() {
    return (
        <div>
            {/* SOCIAL LOGIN */}
            <div className="grid grid-cols-2 gap-4">
            
            <NavLink to={`${import.meta.env.VITE_BASE_URL || 'http://localhost:8083'}/oauth2/authorization/google`}>   

            <Button  type="button" variant="outline" className="ml-auto cursor-pointer flex justify-center ">
                
                <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                >
                <path d="M21.35 11.1h-9.18v2.93h5.27c-.23 1.25-.91 2.31-1.93 3.02v2.5h3.12c1.82-1.67 2.72-4.13 2.72-6.99 0-.65-.07-1.28-.2-1.88z" />
                <path d="M12.17 21c2.61 0 4.8-.86 6.4-2.33l-3.12-2.5c-.87.58-1.98.92-3.28.92-2.52 0-4.66-1.7-5.42-3.99H3.52v2.51C5.1 18.98 8.4 21 12.17 21z" />
                <path d="M6.75 13.1a5.86 5.86 0 0 1 0-3.7V6.89H3.52a9.99 9.99 0 0 0 0 8.22l3.23-2.01z" />
                <path d="M12.17 5.83c1.42 0 2.69.49 3.69 1.45l2.77-2.77C16.96 2.7 14.78 2 12.17 2 8.4 2 5.1 4.02 3.52 6.89l3.23 2.51c.76-2.29 2.9-3.57 5.42-3.57z" />
                </svg>
                Google
            </Button>
            </NavLink>

            <NavLink to={`${import.meta.env.VITE_BASE_URL || 'http://localhost:8083'}/oauth2/authorization/github`}>
                <Button type = "button" variant="outline" className="gap-2 cursor-pointer">
                    
                    <Github className="h-4 w-4" />
                    GitHub
                </Button>
            </NavLink>
            </div>
        </div>
    );
}

export default OAuth2Buttons;