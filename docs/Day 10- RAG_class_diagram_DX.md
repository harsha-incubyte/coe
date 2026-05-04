# Day 10 RAG Architecture

This document contains a class diagram illustrating the Retrieval-Augmented Generation (RAG) implementation for the Day 10 medical chat feature. It maps out the relationships between the frontend components, backend API routes, core RAG library modules, and the data types bridging them.

```mermaid
classDiagram
    %% UI Components
    class Day10 {
        <<View: src/views/Day10/index.tsx>>
        -messageCitations: Record~string, ClientCitation[]~
        -pendingCitationsRef: Promise~ClientCitation[]~
        +fetchCitations(content: string): Promise~ClientCitation[]~
        +handleSendMessage(content: string)
    }

    class MessageList {
        <<Component>>
        +messages: Message[]
        +citationsByMessageId: Record~string, ClientCitation[]~
    }

    class ChatMessage {
        <<Component>>
        +message: Message
        +citations: ClientCitation[]
    }

    class MessageSources {
        <<Component>>
        +citations: ClientCitation[]
        +render()
    }

    %% API Routes
    class CitationsRoute {
        <<API Route: /api/chat/rag-citations/route.ts>>
        +POST(req: Request): NextResponse
    }

    class ChatRoute {
        <<API Route: /api/chat/route.ts>>
        +POST(req: Request): Response
    }

    %% Core RAG Modules
    class Retriever {
        <<Module: src/lib/rag/retriever.ts>>
        -_index: MiniSearch
        +loadAllDocuments(): Promise~PubMedDocument[]~
        +initIndex(): Promise~void~
        +retrieveContext(query: string): Promise~RagContext~
    }

    class IndexBuilder {
        <<Module: src/lib/rag/index-builder.ts>>
        +buildIndex(docs: PubMedDocument[]): MiniSearch
    }

    class Formatter {
        <<Module: src/lib/rag/formatter.ts>>
        +formatRagContext(results: RagSearchResult[]): string
    }

    class MiniSearch {
        <<External>>
        +search(query: string, options: any): any[]
    }

    %% Data Types
    class PubMedDocument {
        <<Interface>>
        +id: string
        +title: string
        +abstract: string
        +authors: string
        +journal: string
        +year: number
        +topic: string
        +meshTerms: string[]
    }

    class ClientCitation {
        <<Interface>>
        +id: string
        +title: string
        +authors: string
        +journal: string
        +year: number
    }

    class RagSearchResult {
        <<Interface>>
        +document: PubMedDocument
        +score: number
    }

    class RagContext {
        <<Interface>>
        +results: RagSearchResult[]
        +query: string
        +retrievedAt: number
    }

    %% Relationships
    Day10 --> MessageList : renders
    MessageList --> ChatMessage : renders
    ChatMessage --> MessageSources : renders conditionally
    MessageSources --> ClientCitation : displays

    Day10 --> CitationsRoute : parallel fetch via fetchCitations()
    Day10 --> ChatRoute : streaming via useChat()

    CitationsRoute --> Retriever : retrieveContext()
    ChatRoute --> Retriever : retrieveContext()
    ChatRoute --> Formatter : formatRagContext()

    Retriever --> IndexBuilder : calls to build index
    Retriever --> MiniSearch : manages instance
    Retriever ..> PubMedDocument : loads JSON data
    Retriever ..> RagContext : returns context

    RagContext *-- RagSearchResult : contains
    RagSearchResult *-- PubMedDocument : encapsulates
    
    CitationsRoute ..> ClientCitation : maps PubMedDocument to
```
