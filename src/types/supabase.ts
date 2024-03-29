export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          created_at: string
          details: string
          id: number
          name: string
          phone: string
          state: string
          user_id: string
        }
        Insert: {
          city: string
          created_at?: string
          details: string
          id?: number
          name: string
          phone: string
          state: string
          user_id: string
        }
        Update: {
          city?: string
          created_at?: string
          details?: string
          id?: number
          name?: string
          phone?: string
          state?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      cart_items: {
        Row: {
          cart_id: number | null
          created_at: string
          id: number
          product_id: number
          qty: number
          user_id: string
        }
        Insert: {
          cart_id?: number | null
          created_at?: string
          id?: number
          product_id: number
          qty: number
          user_id: string
        }
        Update: {
          cart_id?: number | null
          created_at?: string
          id?: number
          product_id?: number
          qty?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "shopping_cart"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      categories: {
        Row: {
          created_at: string
          id: number
          name: string | null
          poster_url: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string | null
          poster_url?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string | null
          poster_url?: string | null
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string
          id: number
          liked: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          liked: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          liked?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          brand: string
          category: number
          colors: string[]
          created_at: string
          description: string
          id: number
          images: string[]
          name: string
          price: number
          rating: number
          size: Database["public"]["Enums"]["sizes"][]
        }
        Insert: {
          brand: string
          category: number
          colors: string[]
          created_at?: string
          description: string
          id?: number
          images: string[]
          name: string
          price: number
          rating: number
          size: Database["public"]["Enums"]["sizes"][]
        }
        Update: {
          brand?: string
          category?: number
          colors?: string[]
          created_at?: string
          description?: string
          id?: number
          images?: string[]
          name?: string
          price?: number
          rating?: number
          size?: Database["public"]["Enums"]["sizes"][]
        }
        Relationships: [
          {
            foreignKeyName: "products_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "subcategories"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          address: string
          avatar_url: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          address: string
          avatar_url?: string | null
          id: string
          name: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          avatar_url?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      shopping_cart: {
        Row: {
          created_at: string
          id: number
          item_count: number | null
          total_price: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          item_count?: number | null
          total_price?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          item_count?: number | null
          total_price?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shopping_cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      subcategories: {
        Row: {
          category: number
          created_at: string
          id: number
          name: string | null
          poster_url: string | null
        }
        Insert: {
          category: number
          created_at?: string
          id?: number
          name?: string | null
          poster_url?: string | null
        }
        Update: {
          category?: number
          created_at?: string
          id?: number
          name?: string | null
          poster_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_fkey"
            columns: ["category"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_cart_item_exists: {
        Args: {
          p_product_id: number
          p_user_id: string
          p_cart_id: number
        }
        Returns: boolean
      }
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
      insert_cart_item: {
        Args: {
          p_product_id: number
          p_user_id: string
          p_qty: number
        }
        Returns: undefined
      }
      update_shopping_cart_item_count: {
        Args: {
          p_user_id: string
        }
        Returns: undefined
      }
      update_shopping_cart_properties: {
        Args: {
          p_user_id: string
        }
        Returns: undefined
      }
      update_shopping_cart_total_price: {
        Args: {
          p_user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      sizes: "S" | "M" | "L" | "XL" | "XXL"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
