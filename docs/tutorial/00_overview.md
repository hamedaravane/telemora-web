# Tutorial: telemora-web

Telemora is a **marketplace** application designed to run within Telegram Mini Apps.
It allows users to **create stores**, **list products**, place and manage **orders**,
and handle **payments**, including integration with the TON blockchain.
The app deeply integrates with the Telegram environment to provide a seamless user experience.

## Visual Overview

```mermaid
flowchart TD
    A0["Telegram Mini App Core Integration
"]
    A1["React Query Data Management
"]
    A2["User Domain Logic
"]
    A3["Store Domain Logic
"]
    A4["Product Domain Logic
"]
    A5["Order Domain Logic
"]
    A6["Payment Integration (TON Connect)
"]
    A7["HTTP Client Utility
"]
    A8["UI Layouts and Navigation
"]
    A0 -- "Provides Auth Data" --> A7
    A0 -- "Influences UI" --> A8
    A1 -- "Manages User Data" --> A2
    A1 -- "Manages Store Data" --> A3
    A1 -- "Manages Product Data" --> A4
    A1 -- "Manages Order Data" --> A5
    A1 -- "Manages Payment Data" --> A6
    A2 -- "Calls User API" --> A7
    A3 -- "Calls Store API" --> A7
    A4 -- "Calls Product API" --> A7
    A5 -- "Calls Order API" --> A7
    A6 -- "Calls Payment API" --> A7
    A5 -- "Facilitates Payment" --> A6
    A6 -- "Handles Wallet Interaction" --> A0
    A8 -- "Displays User Info" --> A2
    A8 -- "Displays Stores" --> A3
    A8 -- "Displays Products" --> A4
    A8 -- "Displays Orders" --> A5
```

## Chapters

1. [Telegram Mini App Core Integration
   ](01_telegram_mini_app_core_integration_.md)
2. [User Domain Logic
   ](02_user_domain_logic_.md)
3. [Store Domain Logic
   ](03_store_domain_logic_.md)
4. [Product Domain Logic
   ](04_product_domain_logic_.md)
5. [Order Domain Logic
   ](05_order_domain_logic_.md)
6. [Payment Integration (TON Connect)
   ](06_payment_integration__ton_connect__.md)
7. [UI Layouts and Navigation
   ](07_ui_layouts_and_navigation_.md)
8. [React Query Data Management
   ](08_react_query_data_management_.md)
9. [HTTP Client Utility
   ](09_http_client_utility_.md)

---
