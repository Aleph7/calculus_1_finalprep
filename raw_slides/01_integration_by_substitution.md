# Module 1: Advanced Integration by Substitution & Boundary Shifts

# Module 1: Integration by Substitution (U-Substitution)
## Calculus 1 - Final Examination Preparation

### 1. Fundamental Principle
If $u = g(x)$ is a differentiable function whose range is an interval $I$, and $f$ is continuous on $I$:
$$\int f(g(x)) g'(x) \, dx = \int f(u) \, du$$

### 2. Definite Integrals and Boundary Shifts
When evaluating definite integrals:
$$\int_{a}^{b} f(g(x)) g'(x) \, dx = \int_{g(a)}^{g(b)} f(u) \, du$$
*Critical Exam Rule*: Never forget to transform the integration bounds $x = a \to u = g(a)$ and $x = b \to u = g(b)$.

### 3. Canonical Exam Patterns
1. Integrals involving $\frac{f'(x)}{f(x)} \to \ln|f(x)| + C$
2. Exponential substitutions: $\int e^{x} f(e^x) \, dx$
3. Radical adjustments: letting $u = \sqrt{ax+b} \implies u^2 = ax+b \implies 2u\,du = a\,dx$.
