import { useState } from "react"
import { Box, Button, List, ListItem, ListItemText, Typography, Avatar } from "@mui/material"
import { ChevronLeft, ChevronRight, MoreVert } from "@mui/icons-material"
import Link from "next/link"

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: expanded ? 240 : 72,
        bgcolor: "white",
        borderRight: "1px solid #ddd",
        boxShadow: 2,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
        <Box
          component="img"
          src="https://img.logoipsum.com/243.svg"
          sx={{
            transition: "width 0.3s",
            width: expanded ? 128 : 0,
            height: "auto",
          }}
          alt="Logo"
        />
        <Button onClick={() => setExpanded((prev) => !prev)} sx={{ p: 1 }}>
          {expanded ? <ChevronLeft /> : <ChevronRight />}
        </Button>
      </Box>

      <List sx={{ flexGrow: 1, px: 2 }}>
        {children}
      </List>

      <Box sx={{ display: "flex", alignItems: "center", p: 2, borderTop: "1px solid #ddd" }}>
        <Avatar
          src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
          sx={{ width: 40, height: 40 }}
        />
        <Box sx={{ ml: 2, display: expanded ? "block" : "none" }}>
          <Typography variant="body1">John Doe</Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            johndoe@gmail.com
          </Typography>
        </Box>
        <Button sx={{ ml: "auto" }}>
          <MoreVert />
        </Button>
      </Box>
    </Box>
  )
}

export function SidebarItem({ icon, text, active, alert, href }) {
  return (
    <ListItem
      component={Link}
      href={href}
      sx={{
        py: 1.5,
        px: 2,
        my: 1,
        borderRadius: 1,
        bgcolor: active ? "rgba(75, 0, 130, 0.1)" : "transparent",
        "&:hover": { bgcolor: "rgba(75, 0, 130, 0.05)" },
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {icon}
        <Typography 
          sx={{
            ml: 2,
            color: 'blue',
            opacity: active ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          adsklajsdkl
        </Typography>
      </Box>
      {alert && (
        <Box
          sx={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
            width: 8,
            height: 8,
            bgcolor: "indigo.400",
            borderRadius: "50%",
          }}
        />
      )}
    </ListItem>
  )
}
