'use client'

import { useState, useEffect } from 'react'
import { supabase, type Expense } from '@/lib/supabase'
import { format } from 'date-fns'

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  
  // Form state
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'))

  const categories = [
    'Food', 'Transport', 'Shopping', 'Entertainment', 
    'Bills', 'Health', 'Education', 'Other'
  ]

  useEffect(() => {
    fetchExpenses()
  }, [])

  async function fetchExpenses() {
    setLoading(true)
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false })
      .limit(20)
    
    if (error) {
      console.error('Error fetching expenses:', error)
    } else {
      setExpenses(data || [])
    }
    setLoading(false)
  }

  async function addExpense(e: React.FormEvent) {
    e.preventDefault()
    
    const { error } = await supabase
      .from('expenses')
      .insert([{
        amount: parseFloat(amount),
        category,
        description,
        date
      }])
    
    if (error) {
      console.error('Error adding expense:', error)
    } else {
      setAmount('')
      setDescription('')
      setShowForm(false)
      fetchExpenses()
    }
  }

  async function deleteExpense(id: string) {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting expense:', error)
    } else {
      fetchExpenses()
    }
  }

  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💰 Expense Tracker</h1>
          <p className="text-gray-600">Track your spending with AI-powered insights</p>
          
          <div className="mt-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-4 text-white">
            <p className="text-sm opacity-90">Total Spent This Month</p>
            <p className="text-3xl font-bold">₹{totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        {/* Add Expense Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-semibold mb-6 hover:shadow-lg transition-all"
        >
          {showForm ? '✕ Cancel' : '+ Add Expense'}
        </button>

        {/* Add Expense Form */}
        {showForm && (
          <form onSubmit={addExpense} className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">New Expense</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="What did you buy?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Add Expense
              </button>
            </div>
          </form>
        )}

        {/* Expenses List */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Expenses</h2>
          
          {loading ? (
            <p className="text-gray-500 text-center py-8">Loading...</p>
          ) : expenses.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No expenses yet. Add your first one!</p>
          ) : (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-gray-800">
                        ₹{Number(expense.amount).toFixed(2)}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        {expense.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{expense.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {format(new Date(expense.date), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="ml-4 text-red-500 hover:text-red-700 text-sm"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>Built with Next.js + Supabase ❤️</p>
        </div>
      </div>
    </div>
  )
}
