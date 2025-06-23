"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Search,
  Calendar,
  User,
  MessageSquare,
  ArrowLeft,
  Trash2,
  Eye,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  timestamp: string
  status: "new" | "read" | "replied"
  priority: "low" | "medium" | "high"
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchMessages() {
      setIsLoading(true)
      try {
        const res = await fetch('/api/contact')
        const data = await res.json()
        if (Array.isArray(data.messages)) {
          // Map MongoDB _id to id for compatibility
          const messages = data.messages.map((msg: any) => ({
            ...msg,
            id: msg._id || msg.id,
          }))
          setMessages(messages)
          setFilteredMessages(messages)
        } else {
          setMessages([])
          setFilteredMessages([])
        }
      } catch (err) {
        setMessages([])
        setFilteredMessages([])
      }
      setIsLoading(false)
    }
    fetchMessages()
  }, [])

  // Filter messages based on search and status
  useEffect(() => {
    let filtered = messages

    if (searchTerm) {
      filtered = filtered.filter(
        (message) =>
          message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          message.message.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedStatus !== "all") {
      filtered = filtered.filter((message) => message.status === selectedStatus)
    }

    setFilteredMessages(filtered)
  }, [searchTerm, selectedStatus, messages])

  const updateMessageStatus = (id: string, status: Message["status"]) => {
    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, status } : msg)))
  }

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((msg) => msg.id !== id))
    setSelectedMessage(null)
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "read":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "replied":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const exportMessages = () => {
    const csvContent = [
      ["Name", "Email", "Subject", "Message", "Date", "Status", "Priority"],
      ...filteredMessages.map((msg) => [
        msg.name,
        msg.email,
        msg.subject,
        msg.message.replace(/\n/g, " "),
        formatDate(msg.timestamp),
        msg.status,
        msg.priority,
      ]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `messages-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading messages...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-950 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="mr-2" size={16} />
                  Back to Portfolio
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Contact Messages</h1>
                <p className="text-gray-400 text-sm">Manage and respond to portfolio inquiries</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                onClick={exportMessages}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <Download className="mr-2" size={16} />
                Export CSV
              </Button>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                size="sm"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                <RefreshCw className="mr-2" size={16} />
                Refresh
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Messages", value: messages.length, color: "text-cyan-400" },
            {
              label: "New Messages",
              value: messages.filter((m) => m.status === "new").length,
              color: "text-green-400",
            },
            {
              label: "Read Messages",
              value: messages.filter((m) => m.status === "read").length,
              color: "text-yellow-400",
            },
            { label: "Replied", value: messages.filter((m) => m.status === "replied").length, color: "text-blue-400" },
          ].map((stat, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-800">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900/50 border-gray-700 text-white"
            />
          </div>
          <div className="flex gap-2">
            {["all", "new", "read", "replied"].map((status) => (
              <Button
                key={status}
                onClick={() => setSelectedStatus(status)}
                variant={selectedStatus === status ? "default" : "outline"}
                size="sm"
                className={
                  selectedStatus === status
                    ? "bg-cyan-500 hover:bg-cyan-600"
                    : "border-gray-600 text-gray-300 hover:bg-gray-800"
                }
              >
                <Filter className="mr-2" size={16} />
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Messages List */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredMessages.length === 0 ? (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-12 text-center">
                  <Mail className="mx-auto mb-4 text-gray-600" size={48} />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No messages found</h3>
                  <p className="text-gray-500">
                    {searchTerm || selectedStatus !== "all"
                      ? "Try adjusting your search or filters"
                      : "No contact messages yet"}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredMessages.map((message) => (
                <Card
                  key={message.id}
                  className={`bg-gray-900/50 border-gray-800 hover:bg-gray-800/50 transition-all cursor-pointer ${
                    selectedMessage?.id === message.id ? "ring-2 ring-cyan-500" : ""
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-white">{message.name}</h3>
                          <Badge className={getStatusColor(message.status)}>{message.status}</Badge>
                          <Badge className={getPriorityColor(message.priority)}>{message.priority}</Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-1">{message.email}</p>
                        <p className="text-gray-300 font-medium mb-2">{message.subject}</p>
                        <p className="text-gray-400 text-sm line-clamp-2">{message.message}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="mr-1" size={12} />
                        {formatDate(message.timestamp)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            updateMessageStatus(message.id, message.status === "read" ? "new" : "read")
                          }}
                          className="text-gray-400 hover:text-white"
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            deleteMessage(message.id)
                          }}
                          className="text-gray-400 hover:text-red-400"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-1">
            {selectedMessage ? (
              <Card className="bg-gray-900/50 border-gray-800 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    <span>Message Details</span>
                    <div className="flex space-x-2">
                      <Badge className={getStatusColor(selectedMessage.status)}>{selectedMessage.status}</Badge>
                      <Badge className={getPriorityColor(selectedMessage.priority)}>{selectedMessage.priority}</Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="text-cyan-400" size={16} />
                      <span className="text-gray-400 text-sm">From</span>
                    </div>
                    <p className="text-white font-medium">{selectedMessage.name}</p>
                    <p className="text-gray-400 text-sm">{selectedMessage.email}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageSquare className="text-cyan-400" size={16} />
                      <span className="text-gray-400 text-sm">Subject</span>
                    </div>
                    <p className="text-white">{selectedMessage.subject}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="text-cyan-400" size={16} />
                      <span className="text-gray-400 text-sm">Date</span>
                    </div>
                    <p className="text-white">{formatDate(selectedMessage.timestamp)}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Mail className="text-cyan-400" size={16} />
                      <span className="text-gray-400 text-sm">Message</span>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{selectedMessage.message}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      onClick={() => {
                        const subject = `Re: ${selectedMessage.subject}`
                        const body = `Hi ${selectedMessage.name},\n\nThank you for your message. \n\n---\nOriginal message:\n${selectedMessage.message}`
                        window.open(
                          `mailto:${selectedMessage.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
                          "_blank",
                        )
                        updateMessageStatus(selectedMessage.id, "replied")
                      }}
                      className="w-full bg-cyan-500 hover:bg-cyan-600"
                    >
                      <Mail className="mr-2" size={16} />
                      Reply via Email
                    </Button>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => updateMessageStatus(selectedMessage.id, "read")}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Mark as Read
                      </Button>
                      <Button
                        onClick={() => deleteMessage(selectedMessage.id)}
                        variant="outline"
                        size="sm"
                        className="flex-1 border-red-600 text-red-400 hover:bg-red-900/20"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-12 text-center">
                  <MessageSquare className="mx-auto mb-4 text-gray-600" size={48} />
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">Select a Message</h3>
                  <p className="text-gray-500">Choose a message from the list to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
