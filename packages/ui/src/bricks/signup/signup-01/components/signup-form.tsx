'use client';

import { Button } from '../../../../components/button';
import { Card } from '../../../../components/card';
import { Checkbox } from '../../../../components/checkbox';
import { Input } from '../../../../components/input';
import { Label } from '../../../../components/label';

export function Signup01() {
  return (
    <div className="flex w-full items-center justify-center">
      <Card className="w-full max-w-sm">
        <Card.Header>
          <Card.Title>Create an account</Card.Title>
          <Card.Description>Enter your details below to create your account</Card.Description>
        </Card.Header>
        <Card.Content>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-3">
              <Input label="First name" placeholder="John" autoComplete="given-name" />
              <Input label="Last name" placeholder="Doe" autoComplete="family-name" />
            </div>
            <Input label="Email" type="email" placeholder="me@example.com" autoComplete="email" />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <Input
              label="Confirm password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <div className="flex items-start gap-2">
              <Checkbox id="signup-01-terms" className="mt-0.5" />
              <Label htmlFor="signup-01-terms" className="text-sm leading-relaxed font-normal">
                I agree to the{' '}
                <a
                  href="/terms"
                  className="text-foreground font-medium underline underline-offset-4 hover:opacity-80"
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="/privacy"
                  className="text-foreground font-medium underline underline-offset-4 hover:opacity-80"
                >
                  Privacy Policy
                </a>
              </Label>
            </div>
            <Button type="submit" fullWidth>
              Create account
            </Button>
          </form>
        </Card.Content>
        <Card.Footer align="center" className="pb-6">
          <p className="text-muted-foreground text-sm">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-foreground font-medium underline underline-offset-4 hover:opacity-80"
            >
              Sign in
            </a>
          </p>
        </Card.Footer>
      </Card>
    </div>
  );
}
