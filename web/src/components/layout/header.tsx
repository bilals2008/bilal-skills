import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useTheme } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { useState } from "react"

const links = [
  { to: "/", label: "Skills" },
  { to: "/about", label: "About" },
  { to: "/contributing", label: "Contributing" },
  { to: "/faq", label: "FAQ" },
]

export function Header() {
  const location = useLocation()
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="text-lg font-bold tracking-tight text-primary">
          bilal-skills
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-1">
          {links.map((link) => (
            <Button
              key={link.to}
              variant="ghost"
              size="sm"
              asChild
              className={cn(
                location.pathname === link.to && "bg-accent text-accent-foreground"
              )}
            >
              <Link to={link.to}>{link.label}</Link>
            </Button>
          ))}
          <Button
            variant="ghost"
            size="icon"
            className="size-9 ml-2"
            onClick={toggle}
          >
            {theme === "dark" ? (
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="size-9"
            onClick={toggle}
          >
            {theme === "dark" ? (
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            ) : (
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="size-9">
                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full">
              <SheetTitle className="text-lg font-bold text-primary">bilal-skills</SheetTitle>
              <nav className="mt-8 flex flex-col gap-2">
                {links.map((link) => (
                  <Button
                    key={link.to}
                    variant="ghost"
                    size="sm"
                    asChild
                    className={cn(
                      "justify-start text-base",
                      location.pathname === link.to && "bg-accent text-accent-foreground"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    <Link to={link.to}>{link.label}</Link>
                  </Button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
