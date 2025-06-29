import Logout from "@mui/icons-material/Logout"
import { Account } from "@toolpad/core/Account"
import type { Session } from "@toolpad/core/AppProvider"
import { AppProvider } from "@toolpad/core/AppProvider"
import type { PropsWithChildren } from "react"
import { useEffect, useMemo, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts"
import { selectLogin, signOut, skipTokenCheck } from "../authSlice.ts"
import { useLocation } from "react-router"

const initialSession: Session = {
  user: {
    name: "",
    email: "",
    image: "https://avatars.githubusercontent.com/u/19550456",
  },
}

export default function AccountCustomSlotProps({
  children,
}: PropsWithChildren) {
  const user = useAppSelector(selectLogin)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const isAuthPage =
    location.pathname === "/sign-in" || location.pathname === "/register"

  const [session, setSession] = useState<Session | null>(initialSession)

  useEffect(() => {
    if (user?.email) {
      setSession({
        user: {
          name: user?.name,
          email: user?.email,
          image: "https://avatars.githubusercontent.com/u/19550456",
        },
      })
    }
  }, [user])

  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: user?.name,
            email: user?.email,
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        })
      },
      signOut: () => {
        setSession(null)
        dispatch(signOut())
        dispatch(skipTokenCheck())
      },
    }
  }, [])

  return (
    <AppProvider authentication={authentication} session={session}>
      {!isAuthPage && (
        <Account
          slotProps={{
            signInButton: {
              color: "success",
            },
            signOutButton: {
              color: "success",
              startIcon: <Logout />,
            },
            preview: {
              variant: "expanded",
              slotProps: {
                avatarIconButton: {
                  sx: {
                    width: "fit-content",
                    margin: "auto",
                  },
                },
                avatar: {
                  variant: "rounded",
                },
              },
            },
          }}
        />
      )}
      {children}
    </AppProvider>
  )
}
