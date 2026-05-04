# Day 10 RAG Architectural Flow

This document contains high-level diagrams designed for team members and stakeholders to understand the architectural flow of the Retrieval-Augmented Generation (RAG) pipeline in the Day 10 medical chat application.

## 1. High-Level Architecture Flowchart
This diagram illustrates the macro-level relationships between the frontend, the API endpoints, the internal RAG engine, the database, and the external LLM provider.

```mermaid
graph TD
    User((User))
    UI[Frontend Client UI]
    Cache[Cache Check]
    DB[(PostgreSQL Database)]
    
    subgraph "API Layer"
        ChatAPI[Chat Streaming API]
        CitationAPI[Citation API]
    end
    
    subgraph "RAG Engine"
        Retriever[Context Retriever]
        SearchIndex[(MiniSearch Index)]
        PubMedData[PubMed JSON Documents]
    end
    
    LLM((LLM Provider))

    User -->|1. Submits Clinical Query| UI
    UI -->|2. Check Cache| Cache
    
    UI -->|3a. Request Stream| ChatAPI
    UI -->|3b. Request Sources| CitationAPI
    
    ChatAPI -->|Save User Msg| DB
    
    PubMedData -->|Loaded on Init| SearchIndex
    CitationAPI -->|Query Context| Retriever
    ChatAPI -->|Query Context| Retriever
    Retriever <-->|Search & Score| SearchIndex
    
    ChatAPI -->|Augment System Prompt| LLM
    LLM -->|Stream Text| ChatAPI
    
    ChatAPI -->|Stream Chunks| UI
    CitationAPI -->|Return Client Citations| UI
    
    ChatAPI -->|Save AI Msg & Citations| DB
```

***

## 2. Request Sequence Diagram
This sequence diagram shows the step-by-step lifecycle of a user query, demonstrating how parallel processing, caching, and database persistence are handled during the RAG workflow.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant UI as Chat UI
    participant Cache as Cache API
    participant CitationAPI as Citation API
    participant ChatAPI as Chat API
    participant RAG as RAG Engine
    participant LLM as LLM Provider
    participant DB as Database

    User->>UI: Submits Clinical Query
    UI->>Cache: Check for exact previous query
    
    alt Cache Hit
        Cache-->>UI: Return cached LLM response
        UI->>CitationAPI: Fetch citations for cached query
        CitationAPI-->>UI: Return citations
        UI->>DB: Batch save user & assistant messages
        UI-->>User: Display instant response & sources
        
    else Cache Miss
        par Fetch Citations (Parallel)
            UI->>CitationAPI: POST /api/chat/rag-citations
            CitationAPI->>RAG: retrieveContext(query)
            RAG-->>CitationAPI: Return top PubMed documents
            CitationAPI-->>UI: Return mapped UI Citations
        and Stream Chat (Parallel)
            UI->>ChatAPI: POST /api/chat (stream)
            ChatAPI->>RAG: retrieveContext(query)
            RAG-->>ChatAPI: Return & format PubMed documents
            ChatAPI->>ChatAPI: Inject context into System Prompt
            ChatAPI->>DB: Save User Message
            ChatAPI->>LLM: Send Augmented Prompt
            LLM-->>UI: Stream text chunks to frontend
            LLM-->>ChatAPI: Stream finished
            ChatAPI->>DB: Save Assistant Message + Citations
        end
        UI-->>User: Display final streamed response & sources
    end
```
