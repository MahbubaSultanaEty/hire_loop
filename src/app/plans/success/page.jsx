import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { CheckCircle2, Mail } from 'lucide-react'
import { Card, Button } from '@heroui/react'
import Link from 'next/link';
import { createSubscription } from '@/lib/actions/subscriptions'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail },
    metadata
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    }
    // update the user about the new plan 
    const result = await createSubscription(subsInfo)
    return (
      <div className="min-h-screen bg-[#0F1117] flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          <Card className="bg-white/[0.03] border-purple-500/10">
            <Card.Content className="flex flex-col items-center text-center py-10 space-y-6">

              {/* Icon */}
              <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <CheckCircle2 size={40} className="text-green-400" />
              </div>

              {/* Text */}
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-white">Payment Successful!</h1>
                <p className="text-white/50 text-sm leading-relaxed">
                  We appreciate your business! A confirmation email will be sent to{' '}
                  <span className="text-purple-400 font-medium">{customerEmail}</span>.
                </p>
              </div>

              {/* Email note */}
              <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 w-full">
                <Mail size={15} className="text-white/30 shrink-0" />
                <p className="text-white/40 text-xs text-left">
                  Questions? Email us at{' '}
                  <a href="mailto:orders@example.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                    orders@example.com
                  </a>
                </p>
              </div>

              {/* CTA */}
              <Link href="/dashboard" className="w-full">
                <Button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-xl shadow-lg shadow-purple-500/25 transition-all">
                  Go to Dashboard
                </Button>
              </Link>

              <Link href="/jobs" className="text-sm text-white/30 hover:text-white/60 transition-colors">
                Browse Jobs →
              </Link>

            </Card.Content>
          </Card>
        </div>
      </div>
    )
  }
}